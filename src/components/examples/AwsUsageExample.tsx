import { useState } from 'react';
import awsConfig from '../../aws-exports';
import {
  AuthUser,
  login,
  logout,
  register,
} from '../../services/authService';
import {
  createUserProfile,
  createVideoMetadata,
  listUserVideos,
  UserProfile,
  VideoMetadata,
} from '../../services/dbService';
import { uploadVideo } from '../../services/storageService';

const AwsUsageExample = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [videos, setVideos] = useState<VideoMetadata[]>([]);
  const [status, setStatus] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleRegister = async () => {
    const result = await register(email, password);
    if (result.error) {
      setStatus(result.error);
      return;
    }
    setUser(result.user);
    setStatus('Registrazione completata');
  };

  const handleLogin = async () => {
    const result = await login({ email, password });
    if (result.error) {
      setStatus(result.error);
      return;
    }
    setUser(result.user);
    setStatus('Login eseguito');
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setProfile(null);
    setVideos([]);
    setStatus('Logout eseguito');
  };

  const handleCreateProfile = async () => {
    if (!user) {
      setStatus('Autenticati prima di creare il profilo');
      return;
    }

    const createdProfile = await createUserProfile({
      userId: user.userId,
      email: user.email || email,
      name: 'Demo User',
    });

    setProfile(createdProfile);
    setStatus('Profilo utente salvato su Redis');
  };

  const handleUploadVideo = async () => {
    if (!user || !selectedFile) {
      setStatus('Seleziona un video e autenticati prima di caricarlo');
      return;
    }

    const uploadResult = await uploadVideo(selectedFile, {
      contentType: selectedFile.type,
    });

    const bucket = process.env.REACT_APP_AWS_S3_BUCKET || awsConfig.aws_user_files_s3_bucket;
    const videoId = typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

    const metadata = await createVideoMetadata({
      videoId,
      ownerId: user.userId,
      s3Url: `s3://${bucket}/${uploadResult.key}`,
      createdAt: new Date().toISOString(),
    });

    setVideos((prev) => [...prev, metadata]);
    setStatus('Video caricato su S3 e metadati salvati su Redis');
  };

  const handleLoadVideos = async () => {
    if (!user) {
      setStatus('Autenticati per leggere i tuoi video');
      return;
    }

    const userVideos = await listUserVideos(user.userId);
    setVideos(userVideos);
    setStatus('Video caricati dal backend');
  };

  return (
    <div className="aws-usage-example">
      <h2>Demo integrazione AWS</h2>
      <p>{status}</p>

      <section>
        <h3>Autenticazione</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button onClick={handleRegister}>Registrati</button>
        <button onClick={handleLogin}>Accedi</button>
        <button onClick={handleLogout}>Esci</button>
      </section>

      <section>
        <h3>Profilo utente</h3>
        <button onClick={handleCreateProfile}>Crea profilo demo</button>
        {profile && (
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        )}
      </section>

      <section>
        <h3>Video</h3>
        <input
          type="file"
          accept="video/*"
          onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
        />
        <button onClick={handleUploadVideo}>Carica video</button>
        <button onClick={handleLoadVideos}>Carica elenco video</button>
        {videos.length > 0 && (
          <ul>
            {videos.map((video) => (
              <li key={video.videoId}>
                {video.videoId} - {video.s3Url}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AwsUsageExample;
