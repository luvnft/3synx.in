'use client';

import { useState } from 'react';
import { AppHero } from '../ui/ui-layout';
import { ClusterUiModal } from './cluster-ui';
import { ClusterUiTable } from './cluster-ui';

export default function ClusterFeature() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <AppHero
        title="Tokenize Real World Assets"
        subtitle="Set up, create publish and manage new investmentment pools."
      >
        <ClusterUiModal
          show={showModal}
          hideModal={() => setShowModal(false)}
        />
        <button
          className="btn btn-xs lg:btn-md btn-primary"
          onClick={() => setShowModal(true)}
        >
          Tokenize RWA
        </button>
      </AppHero>
      <ClusterUiTable />
    </div>
  );
}
