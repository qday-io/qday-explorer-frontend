import type { ButtonProps, IconButtonProps } from "@chakra-ui/react";
import { Button, Skeleton, Flex, IconButton, chakra } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import type { PaginationParams } from "./types";

import IconSvg from "ui/shared/IconSvg";

interface Props extends PaginationParams {
  className?: string;
  firstBtnProps?: ButtonProps;
  preBtnProps?: IconButtonProps;
  nextBtnProps?: IconButtonProps;
}

const Pagination = ({
  page,
  onNextPageClick,
  onPrevPageClick,
  resetPage,
  hasPages,
  hasNextPage,
  className,
  canGoBackwards,
  isLoading,
  isVisible,
  firstBtnProps,
  preBtnProps,
  nextBtnProps,
}: Props) => {
  if (!isVisible) {
    return null;
  }

  const showSkeleton = page === 1 && !hasPages && isLoading;

  return (
    <Flex className={className} fontSize="sm" alignItems="center">
      <Skeleton isLoaded={!showSkeleton} display="inline-block" mr={4} borderRadius="base">
        <Button
          variant="outline"
          size="sm"
          onClick={resetPage}
          isDisabled={page === 1 || isLoading}
          color={color.textTertiyari}
          borderColor={color.textBlack}
          {...firstBtnProps}
        >
          First
        </Button>
      </Skeleton>
      <Flex>
        <Skeleton isLoaded={!showSkeleton} display="inline-block" borderRadius="base">
          <IconButton
            variant="outline"
            onClick={onPrevPageClick}
            size="sm"
            aria-label="Prev page"
            w="36px"
            borderRadius={0}
            borderLeftRadius={4}
            icon={<IconSvg name="arrows/east-mini" w={5} h={5} />}
            isDisabled={!canGoBackwards || isLoading}
            {...preBtnProps}
          />
        </Skeleton>
        <Skeleton isLoaded={!showSkeleton} display="inline-block" borderRadius="base">
          <Button
            variant="outline"
            size="sm"
            data-selected={true}
            borderWidth="1px"
            fontWeight={400}
            h={8}
            minW="36px"
            borderRadius={0}
            cursor="unset"
          >
            {page}
          </Button>
        </Skeleton>
        <Skeleton isLoaded={!showSkeleton} display="inline-block" borderRadius="base">
          <IconButton
            variant="outline"
            onClick={onNextPageClick}
            size="sm"
            borderRadius={0}
            borderRightRadius={4}
            aria-label="Next page"
            w="36px"
            icon={<IconSvg name="arrows/east-mini" w={5} h={5} transform="rotate(180deg)" />}
            isDisabled={!hasNextPage || isLoading}
            {...nextBtnProps}
          />
        </Skeleton>
      </Flex>
      {/* not implemented yet */}
      {/* <Flex alignItems="center" width="132px" ml={ 16 } display={{ base: 'none', lg: 'flex' }}>
            Go to <Input w="84px" size="xs" ml={ 2 }/>
      </Flex> */}
    </Flex>
  );
};

export default chakra(Pagination);
