import { gql, useQuery } from "@apollo/client";
import * as gqlb from "gql-query-builder";

const queryBuilderBatch = (ids, templateBatchFields) => {
    const queryArray = [];
    const initialQuery = {
        operation: `listCode:barcodeBatch(id:${ids[0]})`,
        fields: templateBatchFields,
        variables: {},
    };
    queryArray.push(initialQuery);
    return queryArray;
};

const useWaybillBatch = ({
    id,
    templateBatchFields,
    skip,
    token,
    lang,
}) => {
    const Batch_QUERY = gqlb.query(queryBuilderBatch(id, templateBatchFields));
    const { data, loading } = useQuery(
        gql`${Batch_QUERY.query}`,
        {
            notifyOnNetworkStatusChange: true,
            skip: !id || skip,
            fetchPolicy: "no-cache",
            nextFetchPolicy: "no-cache",
            variables: {
                input: {
                    id,
                },
            },
            ...(token && {
                context: {
                    headers: {
                        authorization: `Bearer ${token}`,
                        ...(lang && { "Content-Language": lang }),
                    },
                },
            }),
            onCompleted: () => {

            },
            onError: (error) => {
                console.log(error);
            },
        }
    );

    let customer
    let parsedData = [];

    if (data?.listCode) {
        customer = data?.listCode.customer
        let concatData = [...data?.listCode.barcodes];
        parsedData = concatData;
    }

    return skip ? null : {
        data,
        parsedData,
        customer,
        loading
    };
};

export default useWaybillBatch;
