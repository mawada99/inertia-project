import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as gqlb from "gql-query-builder";
import { CustomAutocomplete } from "../MUI/CustomAutocomplete";
import { Globals } from "../Classes/Globals";
import { LIST_BRANCHES_DROPDOWN } from "../../../GlobalsQuery/ListDropdown/ListDropdown";

export const USER_BRANCH = gqlb.query({
  operation: "me",
  fields: [{ userBranches: [{ branch: ["id", "name"] }] }],
  variables: {},
});

const ListBranches = (props) => {
  const { defaultValue, skipDefaultBranch, ...restProps } = props;
  const [value, setValue] = useState(null);
  const { t } = useTranslation();
  const userDefaultValue = Globals.user?.userBranches?.find(
    (i) => i.default === true && i.branch?.active
  )?.["branch"];
  useEffect(() => {
    if (userDefaultValue && !skipDefaultBranch) {
      setValue(userDefaultValue);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDefaultValue]);

  const parseData = (data) => {
    return data;
  };

  return (
    <CustomAutocomplete
      label={t("branch")}
      parseData={parseData}
      query={LIST_BRANCHES_DROPDOWN.query}
      defaultValue={defaultValue ?? value}
      // skip={skip || (!defaultValue && !value)}
      // selectFirst={!!value}
      // variables={{
      //   input: {
      //     all: true,
      //   },
      // }}
      {...restProps}
    />
  );
};

export default memo(ListBranches);
