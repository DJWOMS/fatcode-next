// next
import Head from 'next/head';
import {Container, Typography} from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import {useSettingsContext} from '../../components/settings';

// ----------------------------------------------------------------------

Home.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Home() {
  const {themeStretch} = useSettingsContext();

  return (
    <>
      <Head>
        <title> Page Six | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Home
        </Typography>

        <Typography gutterBottom>
          Curabitur turpis. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc,
        </Typography>

      </Container>
    </>
  );
}
