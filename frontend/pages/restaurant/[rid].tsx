import React, { useState } from 'react';
import { useRouter } from 'next/router';
import DishesList from '../../components/Dishes';

const Dishes = () => {
  const router = useRouter();
  const [rid, setRid] = useState('');
  React.useEffect(() => {
    if (router.isReady) {
      setRid(router.query.rid as string);
    }
  }, [router.isReady]);

  return <DishesList restId={rid} />;
};

export default Dishes;
