import clsx from 'clsx';
import React from 'react';

type Props = {
  children: React.ReactNode;
  title?: string;
  className?: string;
  childrenClassName?: string;
};

export default function Card({ children, title, className, childrenClassName }: Props) {
  return (
    <div
      className={clsx(
        'p-4 rounded-xl bg-linear-to-br from-card to-card/60 dark:bg-zinc-800 shadow-md flex flex-col gap-4 2xl:h-full border dark:border-none',
        className
      )}
    >
      <h2 className="text-2xl font-semibold text-green-500">{title}</h2>
      <div className={clsx(childrenClassName, 'animate-[fade-in_1s_ease-out_forwards] 2xl:flex-1')}>{children}</div>
    </div>
  );
}
