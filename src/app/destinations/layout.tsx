'use client';

import React from "react";
import { usePathname } from "next/navigation";
import styles from "./destinations.module.scss";

export default function DestinationsLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // We determine if a modal is active by checking the pathname.
  // If we are not on the base /destinations route, we assume a parallel route is active.
  const modalActive = pathname !== '/destinations';

  return (
    <div className={`${styles.container} ${modalActive ? styles.modalActive : ''}`}>
      <div className={styles.mainContent}>
        {children}
      </div>
      {modal}
    </div>
  );
}
