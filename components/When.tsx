import React from "react";

// Type for SWR-like async states
interface AsyncState<TData, TError = Error> {
  isLoading: boolean;
  error?: TError;
  data?: TData;
}

interface WhenProps<TData, TError = Error> {
  loading?: () => React.ReactElement;
  error?: (error: TError) => React.ReactElement;
  success?: (data: TData) => React.ReactElement;
  asyncState: AsyncState<TData, TError>;
}

/**
 * When helper component optimized for SWR hooks
 * Handles loading, error, and success states with proper typing
 */
const When = <TData, TError = Error>({
  loading,
  error,
  success,
  asyncState: { isLoading, error: errorState, data },
}: WhenProps<TData, TError>): React.ReactElement | null => {
  // Loading state
  if (isLoading) {
    return <>{loading?.()}</>;
  }

  // Error state
  if (errorState && error) {
    return <>{error(errorState)}</>;
  }

  // Success state with data
  if (data && success) {
    return <>{success(data)}</>;
  }

  return null;
};

export default When;
