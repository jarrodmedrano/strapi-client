import React, { useState } from 'react';
import DishesList from '../../components/Dishes';

import { useRouter } from 'next/router';

const Dishes = () => {
  const router = useRouter();
  const [rid, setRid] = useState('');
  React.useEffect(() => {
    if (router.isReady) {
      // Code using query
      console.log(router.query.rid);
      setRid(router.query.rid as string);
    }
  }, [router.isReady]);

  return <DishesList restId={rid} />;
};

export default Dishes;
