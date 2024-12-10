import { gql, useQuery } from "@apollo/client";
import * as gqlb from "gql-query-builder";

const queryBuilder = (ids, templateRequestFields) => {
  const queryNumber = Math.ceil(ids.length / 100);
  const queryArray = [];
  for (let index = 0; index < queryNumber; index++) {
    const id = ids.slice(100 * index, 100 * (index + 1));
    const initialQuery = {
      operation: `list${index}:listRequests(first:100,input:{id:[${id}]})`,
      fields: templateRequestFields,
      variables: {},
    };
    queryArray.push(initialQuery);
  }
  return queryArray;
};

const useWaybillRequest = ({
  id,
  templateRequestFields,
  skip,
  token,
  lang,
}) => {
  const REQUEST_QUERY = gqlb.query(queryBuilder(id, templateRequestFields));
  const { data, loading } = useQuery(
    gql`
      ${REQUEST_QUERY.query}
    `,
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
      onCompleted: () => {},
      onError: (error) => {
        console.log(error);
      },
    }
  );

  let parsedData = [];
  if (data?.list0) {
    let concatData = [];
    for (const key in data) {
      if (key.startsWith("list")) {
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
        loading,
      };
};

export default useWaybillRequest;
