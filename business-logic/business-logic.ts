import { EPC, EPCData } from '../utils/types-and-interfaces';
import axios, { AxiosResponse } from 'axios';
import { EPC_API_KEY } from '../index';
import { parseAsEPC  } from '../utils/type-guards';

function findPropertyOfInterestCert(certs: EPC[], firstLineAddress: string): EPC {
    return <EPC>certs.find((element) => {
        return element.address.includes(firstLineAddress);
    });
}

function noEnergyCertificate(propertyOfInterest: EPC | undefined): boolean | undefined {
    if (propertyOfInterest === undefined) {
        return true;
    }
    return !propertyOfInterest.current_energy_rating;
}

async function getCertificatesByPostcode(postcode: string): Promise<AxiosResponse> {
    const url = `https://epc.opendatacommunities.org/api/v1/domestic/search?postcode=${postcode}`;
    const encodedUrl = encodeURI(url);
    const headers = {
        Accept: `application/json`,
        Authorization: `Basic ${EPC_API_KEY}`
    };
    return await axios.get<EPCData>(encodedUrl, { headers: headers });
}

export const filterByEPC = async (firstLineAddress: string, postcode: string): Promise<boolean> => {

    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const certsResponse: AxiosResponse<EPCData> = await getCertificatesByPostcode(postcode);
        const certsJSON = certsResponse.data.rows;
        const typedCerts = certsJSON.map(element => parseAsEPC(element));
        const propertyOfInterestCert = findPropertyOfInterestCert(typedCerts, firstLineAddress);

        //could clean this logic and use short circuit evaluation but left as is for readability.
        const noEnergyCert = noEnergyCertificate(propertyOfInterestCert);
        if (noEnergyCert) {
            return true;
        }
        else return ['G', 'F', 'E'].includes(propertyOfInterestCert.current_energy_rating);
    } catch (e) {
        return false;
    }
};

export const filterByEPCWrapper = async (): Promise<boolean> => {
    const postcode = 'W9 1SE';
    const firstLineAddress = 'Maida Vale';

    return await filterByEPC(firstLineAddress, postcode);
};

