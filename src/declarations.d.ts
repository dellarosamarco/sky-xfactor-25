declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}

declare module "*.mp3" {
  const src: string;
  export default src;
}

declare module "./aws-exports" {
  const awsmobile: Record<string, any>;
  export default awsmobile;
}
