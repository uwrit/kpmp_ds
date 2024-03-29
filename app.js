const kpmpMembers = [
    {
        short: 'uw',
        institution: 'University of Washington',
        entityId: 'urn:mace:incommon:washington.edu'
    },
    {
        short: 'um',
        institution: 'University of Michigan',
        entityId: 'https://shibboleth.umich.edu/idp/shibboleth'
    },
    {
        short: 'broad',
        institution: 'Broad Institute',
        entityId: 'https://idp01.broadinstitute.org/idp/shibboleth'
    },
    {
        short: 'columbia',
        institution: 'Columbia University',
        entityId: 'urn:mace:incommon:columbia.edu'
    },
    {
        short: 'harvard',
        institution: 'Harvard',
        entityId: 'https://fed.huit.harvard.edu/idp/shibboleth'
    },
    {
        short: 'iu',
        institution: 'Indiana University',
        entityId: 'https://idp.login.iu.edu/idp/shibboleth'
    },
    {
        short: 'THE',
        institution: 'Ohio State University',
        entityId: 'urn:mace:incommon:osu.edu'
    },
    {
        short: 'ucsf',
        institution: 'UC San Francisco',
        entityId: 'urn:mace:incommon:ucsf.edu'
    },
    {
        short: 'utsw',
        institution: 'UT Southwestern',
        entityId: 'https://shib2.swmed.edu/idp/shibboleth'
    },
    {
        short: 'ucsd',
        institution: 'UC San Diego',
        entityId: 'urn:mace:incommon:ucsd.edu'
    },
    {
        short: 'pitt',
        institution: 'University of Pittsburgh',
        entityId: 'https://passport.pitt.edu/idp/shibboleth'
    },
    {
        short: 'uthsa',
        institution: 'University of Texas Health San Antonio',
        entityId: 'https://shib.uthscsa.edu/idp/shibboleth'
    },
    {
        short: 'washu',
        institution: 'Washington University in St Louis',
        entityId: 'https://login.wustl.edu/idp/shibboleth'
    },
    {
        short: 'yale',
        institution: 'Yale University',
        entityId: 'https://auth.yale.edu/idp/shibboleth'
    },
    {
        short: 'nih',
        institution: 'National Institutes of Health',
        entityId: 'urn:mace:incommon:nih.gov'
    },
    {
        short: 'princeton',
        institution: 'Princeton University',
        entityId: 'https://idp.princeton.edu/idp/shibboleth'
    },
    {
        short: 'duke',
        institution: 'Duke University',
        entityId: 'urn:mace:incommon:duke.edu'
    },
    {
        short: 'jhu',
        institution: 'Johns Hopkins',
        entityId: 'urn:mace:incommon:johnshopkins.edu'
    },
    {
        short: 'stanford',
        institution: 'Stanford University',
        entityId: 'urn:mace:incommon:stanford.edu'
    },
    {
        short: 'vanderbilt',
        institution: 'Vanderbilt University',
        entityId: 'https://sso-login-uat.vanderbilt.edu'
    },
    {
        short: 'cwru',
        institution: 'Case Western Reserve University',
        entityId: 'urn:mace:incommon:case.edu'
    },
    {
        short: 'north',
        institution: 'Northwestern University',
        entityId: 'urn:mace:incommon:northwestern.edu'
    },
    {
        short: 'cincinnati',
        institution: 'University of Cincinnati',
        entityId: 'https://login.uc.edu/idp/shibboleth'
    },
    {
        short: 'ms',
        institution: 'Icahn School of Medicine at Mount Sinai',
        entityId: 'https://sso.mssm.edu/idp'
    },
    {
        short: 'arizona',
        institution: 'University of Arizona',
        entityId: 'urn:mace:incommon:arizona.edu'
    },
    {
        short: 'florida',
        institution: 'University of Florida',
        entityId: 'https://login.ufl.edu/idp/shibboleth'
    },
    {
        short: 'illinois',
        institution: 'University of Illinois Chicago',
        entityId: 'https://shibboleth.uic.edu/shibboleth'
    },
    {
        short: 'minnesota',
        institution: 'University of Minnesota',
        entityId: 'urn:mace:incommon:umn.edu'
    },
    {
        short: 'ncch',
        institution: 'University of North Carolina at Chapel Hill',
        entityId: 'urn:mace:incommon:unc.edu'
    },
    {
        short: 'anschutz',
        institution: 'University of Colorado Denver | Anschutz Medical Campus',
        entityId: 'https://idcs-6dfbdd810afa4d509f6cfc191d612acd.identity.oraclecloud.com:443/fed'
    },
    {
        short:'heidelberg',
        institution: 'Universität Heidelberg',
        entityId: 'https://idp.uni-heidelberg.de'
    }
].sort(function (a, b) {
    if (a.institution < b.institution) return -1;
    if (a.institution > b.institution) return 1;
    return 0;
});

function idpOption(member) {
    return '<li class="idp-option" id="' + member.short + '"><div class="idp-option-text">' + member.institution + '</div></li>';
}

// TODO(cspital) refactor this to be more flexible
function getShibbolethParams() {
    const specParams = ['policy=', 'returnIDParam=', 'isPassive='];
    const url = window.location.search.substr(1);
    const result = {};
    if (!url) {
        return result;
    }
    let target = url.split('return=');
    if (target.length !== 2) {
        return result;
    }
    target = target[1];
    for (let maybe in specParams) {
        const extra = target.split(specParams[maybe], 1);
        if (extra.length) {
            target = extra[0];
        }
    }
    if (target.charAt(target.length - 1) === '&') {
        target = target.substring(0, target.length - 1);
    }
    target = decodeURIComponent(target);
    result['return'] = target;
    return result;
}

const params = Object.freeze(getShibbolethParams());

function setCookie(key, value, days) {
    if (!value) return;
    const exp = new Date();
    const shift = days || 365;
    exp.setTime(exp.getTime() + shift * 24 * 60 * 60 * 1000);
    expires = 'expires=' + exp.toUTCString() + ';';
    document.cookie = key + '=' + value + ';' + expires;
}

function deleteCookie(key) {
    const exp = new Date();
    exp.setTime(exp.getTime() - 365 * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + exp.toUTCString();
    document.cookie = key + '=;' + expires + ';';
}

function getCookie(key) {
    const name = key + '=';
    const decoded = document.cookie;
    const all = decoded.split(';');
    for (let i = 0; i < all.length; i++) {
        let c = all[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

const baseUrl = 'https://welcome.kpmp.org/Shibboleth.sso/Login?';

function getRedirectUri(homebase) {
    const url = baseUrl;
    const entity = 'entityID=' + homebase.entityId;

    let target = '';
    if (params.return) {
        target = params.return + '&';
    } else {
        console.warn("KPMP wasn't told where to redirect back to, defaulting.");
        // TODO(cspital) figure out a sane fallback if there is no target
        // target = '&target=/';
        target = 'https://welcome.kpmp.org/Shibboleth.sso/Login?' + '&SAMLDS=1&target=%2F&';
    }

    let extra = '';
    if (homebase.extra) {
        extra = '&' + encodeURIComponent(homebase.extra);
    }

    return target + entity + extra;
}

$('#idp-dropdown-btn').click(function () {
    setTimeout(function () { $('#idp-search').focus() }, 0);
});

$(document).on('click', '.idp-option', function (e) {
    let recv = e.target;
    if (recv.nodeName === 'DIV' && recv.classList.contains('idp-option-text')) {
        recv = recv.parentNode;
    }
    const id = recv.id;
    const member = kpmpMembers.filter(function (m) { return m.short === id })[0];
    const btn = $('#idp-dropdown-instr');
    btn.text(member.institution);
    btn.data('short', id);
});

$('#idp-search').on('input', function (e) {
    const value = e.target.value.toLowerCase().trim();
    if (!value) {
        for (let idp in ALL_IDPS) {
            $(ALL_IDPS[idp]).show();
        }
        return;
    }

    for (let idp in ALL_IDPS) {
        const elem = $(ALL_IDPS[idp]);
        const inner = elem.text().toLowerCase().trim();
        if (inner.indexOf(value) === -1) {
            elem.hide();
        } else {
            elem.show();
        }
    }
});

$('#idp-select-btn').click(function (e) {
    const remember = $('#remember-me-check')[0];
    const short = $('#idp-dropdown-instr').data('short');
    if (!short) {
        return;
    }

    let homebase = kpmpMembers.filter(function (m) { return m.short === short });
    if (!homebase.length) {
        return;
    }

    homebase = homebase[0];
    if (remember.checked) {
        setCookie('homebase', homebase.short);
    } else {
        deleteCookie('homebase');
    }

    const target = getRedirectUri(homebase);
    window.location.href = target;
});

let ALL_IDPS
$(function () {
    const idps = kpmpMembers.map(idpOption);
    $('#idp-list').html(idps);
    $('#idp-search').val('');
    ALL_IDPS = $('.idp-option');

    const short = getCookie('homebase');
    if (short) {
        $('#remember-me-check')[0].checked = true;

        let homebase = kpmpMembers.filter(function (m) { return m.short === short });
        if (homebase.length) {
            homebase = homebase[0];
            const btn = $('#idp-dropdown-instr');
            btn.text(homebase.institution);
            btn.data('short', homebase.short);
        } else {
            deleteCookie('homebase');
        }
    }
});
