import globals from "globals";

export default [
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                ...globals.node,
                ...globals.es2021,
            }
        },
        rules: {
            "no-undef": "off",           // generated code uses bot, skills, world, etc.
            "no-unused-vars": "off",     // generated code may declare unused vars
            "no-constant-condition": "off",
            "no-empty": "off",
        }
    }
];
