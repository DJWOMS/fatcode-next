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
import AuthVerifyCodeForm from '../../sections/auth/AuthVerifyCodeForm';
// assets
import { EmailInboxIcon } from '../../assets/icons';

// ----------------------------------------------------------------------

VerifyCodePage.getLayout = (page) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function VerifyCodePage() {
  return (
    <>
      <Head>
        <title> Verify Code | Fatcode</title>
      </Head>

      <EmailInboxIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        Пожалуйста, проверьте свою электронную почту!
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        Мы отправили по электронной почте 6-й код подтверждения, пожалуйста, введите код в поле ниже,
        чтобы подтвердить свой адрес электронной почты.
      </Typography>

      <AuthVerifyCodeForm />

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
