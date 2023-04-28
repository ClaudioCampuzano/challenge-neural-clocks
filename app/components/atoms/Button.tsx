import React, { ReactNode } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { SettingIcon, NextStepIcon } from '@/assets';

interface Props {
  children: ReactNode;
  iconName?: 'SettingIcon' | 'NextStepIcon';
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
}

const icons = { SettingIcon, NextStepIcon };
const stylesWithIcon = 'flex flex-row items-center';
const defaultStyles = [
  'rounded',
  'text-center',
  'border',
  'border-solid',
  'border-transparent	',
  'py-0.5',
  'px-2',
  'hover:text-primary-90',
  'hover:no-underline',
  'hover:border-neutral-80',
  'active:border-neutral-95',
];

/**
 * Reusable button component that can be rendered as a button element or a link to as desired.
 * Can include an icon, can be active or inactive, and can be disabled.
 *
**/
export const Button = ({
  children,
  iconName = undefined,
  onClick = undefined,
  disabled = false,
  href = undefined,
  active = false,
}: Props) => {
  if (onClick)
    return (
      <button
        className={clsx(
          defaultStyles,
          active ? 'bg-green text-white' : 'bg-white text-primary-80',
          {
            [stylesWithIcon]: iconName,
          },
        )}
        onClick={onClick}
        disabled={disabled}
      >
        {iconName && (
          <div className="mr-2 flex items-center">
            <Image src={icons[iconName]} alt="icon" width={25} height={25} aria-hidden />
          </div>
        )}
        {children}
      </button>
    );

  return (
    <a href={href} className={clsx(defaultStyles, 'bg-neutral-20 text-white')} target="_self">
      {children}
    </a>
  );
};
