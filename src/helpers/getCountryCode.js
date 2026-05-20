export function getCountryCode(flags, nationality) {
    console.log("flags ", flags, nationality)
    const flag = flags.find(flag => flag.nationality === nationality);
    console.log(flag);
    return flag?.alpha_2_code;
}



