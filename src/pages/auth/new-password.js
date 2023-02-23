// next
import Head from 'next/head';
import NextLink from 'next/link';
// @mui
import { Link, Typography } from '@mui/material';
// layouts
import CompactLayout from '../../layouts/compact';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
// sections
import AuthNewPasswordForm from '../../sections/auth/AuthNewPasswordForm';
// assets
import { SentIcon } from '../../assets/icons';

// ----------------------------------------------------------------------

NewPasswordPage.getLayout = (page) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function NewPasswordPage() {
  return (
    <>
      <Head>
        <title> New Password | Fatcode</title>
      </Head>

      <SentIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        Запрос отправлен успешно!
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        Мы отправили 6-й код в электронном письме для подтверждением.
        <br />
        Пожалуйста, введите код в поле ниже, чтобы подтвердить свой адрес электронной почты.
      </Typography>

      <AuthNewPasswordForm />

      <Typography variant="body2" sx={{ my: 3 }}>
        Нет кода? &nbsp;
        <Link variant="subtitle2">Отправить еще раз</Link>
      </Typography>

      <Link
        component={NextLink}
        href={PATH_AUTH.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:chevron-left-fill" width={16} />
        Вернуться на страницу входа
      </Link>
    </>
  );
}
