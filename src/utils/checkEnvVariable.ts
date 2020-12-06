export = (env_var: string | undefined) : string | undefined  => {
    if(typeof env_var === 'string') return env_var;
    throw new Error(`Missing value in process.env.${env_var}`);
}