import { createContext, useContext } from "react";

export const PackageCommodities = createContext({});

const PackageCommoditiesProvider = (props) => {
  const { value } = props;
  return (
    <PackageCommodities.Provider value={value}>
      {props.children}
    </PackageCommodities.Provider>
  );
};

export default PackageCommoditiesProvider;

export const usePackageCommodities = () => {
  const packageCommodities = useContext(PackageCommodities);

  return {
    packageCommodities,
  };
};
