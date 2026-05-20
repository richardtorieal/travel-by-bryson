'use client';

import React from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import styles from "./destinations.module.scss";

export default function DestinationsLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  // useSelectedLayoutSegment('modal') will return the segment name (e.g. 'lisbon')
  // if the parallel route is active, otherwise null.
  const modalSegment = useSelectedLayoutSegment('modal');
  const modalActive = !!modalSegment;

  return (
    <div className={`${styles.container} ${modalActive ? styles.modalActive : ''}`}>
      <div className={styles.mainContent}>
        {children}
      </div>
      {modal}
    </div>
  );
}
