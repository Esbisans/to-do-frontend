

export const getEnv = () => {

    const env=import.meta.env;

    return {
        ...env
    }

}