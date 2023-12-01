import { ReactNode } from 'react';
import { AuthProvider } from '@components/Auth';
import { ColorModeProvider } from '@components/ColorScheme';

// Dependencies
interface ProvidersProps {
    children: ReactNode;
}

export default function Providers({ children }: ProvidersProps): JSX.Element {
    return (
        <AuthProvider>
            <ColorModeProvider>{children}</ColorModeProvider>
        </AuthProvider>
    );
}
