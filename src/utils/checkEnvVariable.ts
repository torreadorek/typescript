export = (env_var: string | undefined) : string   => {
    if(typeof env_var === 'string') return env_var;
    throw new Error(`Missing value in ${env_var}`);
}