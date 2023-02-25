// next
import Head from 'next/head';
// @mui
import {Container} from '@mui/material';
// routes
import {PATH_USER} from '../../routes/paths';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import {useSettingsContext} from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import UserNewEditForm from '../../sections/user/UserNewEditForm';
import {useAuthContext} from "../../auth/useAuthContext";

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const {themeStretch} = useSettingsContext();

  const { user } = useAuthContext();


  return (
    <>
      <Head>
        <title> Редактировать пользователя | FatCode</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Редактировать"
          links={[
            {
              name: 'Пользователи',
              href: PATH_USER.list,
            },
            {name: user?.username},
          ]}
        />

        <UserNewEditForm isEdit currentUser={user}/>
      </Container>
    </>
  );
}
