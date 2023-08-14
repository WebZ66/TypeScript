export type SFCWithInstall<T> = T
export const withInstall = <T extends { install: (app) => void }, E extends Record<string, any>>(
    main: T,
    extra?: E
) => {
    main.install = (app): void => {
        for (const comp of [main, ...Object.values(extra ?? {})]) {
            app.component(comp.name, comp)
        }
    }

    if (extra) {
        for (const [key, comp] of Object.entries(extra)) {
            ;(main as any)[key] = comp
        }
    }
    return main as SFCWithInstall<T> & E
}
