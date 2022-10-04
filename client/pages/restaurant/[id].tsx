import React, { useState } from 'react';
import { useRouter } from 'next/router';
import DishesList from '../../components/Dishes';

const Dishes = () => {
  const router = useRouter();
  const [id, setid] = useState('');
  React.useEffect(() => {
    if (router.isReady) {
      setid(router.query.id as string);
    }
  }, [router.isReady]);

  return <DishesList restId={id} />;
};

export default Dishes;
