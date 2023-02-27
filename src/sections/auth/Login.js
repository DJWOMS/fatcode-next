// next
import NextLink from 'next/link';
// @mui
import { Alert, Stack, Typography, Link } from '@mui/material';
// layouts
import LoginLayout from '../../layouts/login';
// routes
import { PATH_AUTH } from '../../routes/paths';
//
import AuthLoginForm from './AuthLoginForm';
import AuthWithSocial from './AuthWithSocial';

// ----------------------------------------------------------------------

export default function Login() {

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Войти в аккаунт FatCode</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">Новый пользователь?</Typography>

          <Link component={NextLink} href={PATH_AUTH.register} variant="subtitle2">
            Создать аккаунт
          </Link>
        </Stack>
      </Stack>

      <AuthLoginForm />

      <AuthWithSocial />
    </LoginLayout>
  );
}
