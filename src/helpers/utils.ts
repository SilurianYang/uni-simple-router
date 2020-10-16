
export function appPlatform():string {
    return (process.env.VUE_APP_PLATFORM as string);
}