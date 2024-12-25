import { gql, useQuery } from "@apollo/client";
import * as gqlb from "gql-query-builder";

const operationQuery = (operation) => ({
    operation: operation,
    fields: [
        {
            operation: "paginatorInfo",
            fields: ["lastPage"],
            variables: {},
        },
    ],
    variables: {
        input: {
            type: "ListPackageDetailsFilterInput",
        },
        page: {
            type: "Int",
        },
        first: {
            type: "Int",
        },
    },
});
const useWaybillDetails = ({
    numericIds,
    key,
    templateDetailFields,
    skip,
    token,
    lang,
}) => {
    const OPERATION_QUERY = gqlb.query(operationQuery("listPackageDetails"));

    const { data: lastPage, loading: loadingPage } = useQuery(
        gql`
            ${OPERATION_QUERY.query}
        `,
        {
            notifyOnNetworkStatusChange: true,
            skip: !numericIds || skip,
            fetchPolicy: "no-cache",
            nextFetchPolicy: "no-cache",
            variables: {
                input: { [key]: key === "id" ? numericIds : numericIds[0] },
                first: 100,
            },
            ...(token && {
                context: {
                    headers: {
                        authorization: `Bearer ${token}`,
                        ...(lang && { "Content-Language": lang }),
                    },
                },
            }),
            onCompleted: () => {},
            onError: (error) => {
                console.log(error);
            },
        }
    );

    const pagesCount =
        lastPage?.listPackageDetails.paginatorInfo?.lastPage ?? 1;

    let manifestBody;
    if (lastPage && !skip) {
        manifestBody = [];

        for (let index = 0; index < pagesCount; index++) {
            const initialQuery = {
                operation: `listPackageDetails${index}:listPackageDetails`,
                fields: [...templateDetailFields],
                variables: {
                    input: {
                        type: "ListPackageDetailsFilterInput",
                    },
                    first: {
                        type: "Int",
                    },
                    ["page" + index]: {
                        type: "Int",
                        name: "page",
                    },
                },
            };
            manifestBody.push(initialQuery);
        }
    }

    const MANIFEST_QUERY = manifestBody ? gqlb.query(manifestBody) : null;
    console.log(MANIFEST_QUERY);

    // let parsedData = [];
    let variables = {
        input: { [key]: key === "id" ? numericIds : numericIds[0] },
        first: 100,
    };
    for (let index = 0; index < pagesCount; index++) {
        variables["page" + index] = index + 1;
    }

    const { data, loading: loadingList } = useQuery(
        MANIFEST_QUERY
            ? gql`
                  ${MANIFEST_QUERY.query}
              `
            : gql`
                  query {
                      __typename
                  }
              `,
        {
            fetchPolicy: "no-cache",
            nextFetchPolicy: "no-cache",
            skip: !MANIFEST_QUERY,
            variables: {
                ...MANIFEST_QUERY?.variables,
                ...variables,
            },
            onCompleted: (data) => {},
            onError: (error) => {
                console.log(error);
            },
        }
    );

    let parsedData = [];
    if (data?.listPackageDetails0) {
        let concatData = [];
        for (const key in data) {
            if (key.startsWith("listPackageDetails")) {
                const listData = data[key].data;
                concatData = concatData.concat(listData);
            }
        }
        parsedData = concatData;
    }

    return skip
        ? null
        : {
              data,
              parsedData,
              loading: loadingPage || loadingList,
          };
};

export default useWaybillDetails;
