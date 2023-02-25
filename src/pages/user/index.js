import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// routes
import { PATH_USER } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (pathname === PATH_USER.root) {
      push(PATH_USER.account);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
