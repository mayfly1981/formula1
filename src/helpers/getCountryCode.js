export function getCountryCodeByNationality(flags, nationality) {
    if (nationality === "British") {
        return "GB";
    }

    if (nationality === "Dutch") {
        return "NL";
    }

    if (nationality === "Azerbaijani") {
        return "AZ";
    }

    const flag = flags.find(flag => flag.nationality === nationality);
    // console.log(flag);
    return flag?.alpha_2_code;
}

export function getCountryCodeByShortName(flags, nationality) {

    const flag = flags.find(flag => flag.en_short_name === nationality);

    return flag?.alpha_2_code;
}