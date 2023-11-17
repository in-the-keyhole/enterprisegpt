import { authenticate } from 'ldap-authentication';
import querystring from 'querystring';

const ldapUrl = process.env.LDAP_URL;
const ldapCredentials = process.env.LDAP_CREDENTIALS;

export const handler = async (event) => {

  const { username, password } = querystring.parse(event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf-8') : event.body);

  try {
    let authenticated = await authenticate({
      ldapOpts: {
        url: ldapUrl,
        bindDN: 'cn=KeyholeRootUser,cn=Root DNs,cn=config',
        bindCredentials: ldapCredentials
      },
      userDn: `uid=${username},ou=users,dc=keyholesoftware,dc=com`,
      userPassword: `${password}`,
    });
    return {
      statusCode: authenticated ? 200 : 401
    }
  } catch (e) {
    console.log(e);
    return {
      statusCode: 401
    }
  }
}



