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
  const modalSegment = useSelectedLayoutSegment('modal');
  const modalActive = !!modalSegment;

  return (
    <div 
      className={`${styles.container} ${modalActive ? styles.modalActive : ''}`}
      key={modalActive ? 'modal-view' : 'gallery-view'}
    >
      <div className={styles.mainContent}>
        {children}
      </div>
      {modal}
    </div>
  );
}
