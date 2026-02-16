import { useCallback, useRef } from "react";

type SetParams<T> = (newParams?: Partial<T>) => void;
type UseParamsReturn<T> = [T, SetParams<T>];

export const useParams = <T extends object>(
  params: T
): UseParamsReturn<T> => {
  const isContainsFunctions = (obj: object): boolean =>
    Object.values(obj).some((value) => typeof value === "function");
  const paramsRef = useRef(
    isContainsFunctions(params) ? params : structuredClone(params)
  );

  const setParams = useCallback<SetParams<T>>((newParams) => {
    if (newParams === undefined) return;
    for (const key in newParams) {
      const paramKey = key as keyof T;
      if (
        paramKey in paramsRef.current &&
        newParams[paramKey] !== undefined &&
        newParams[paramKey] !== null
      ) {
        paramsRef.current[paramKey] = newParams[paramKey] as T[keyof T];
      }
    }
  }, []);

  return [paramsRef.current, setParams];
};
