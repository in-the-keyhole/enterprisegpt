import { ReactNode } from 'react';
import { ColorModeProvider } from '@/components/ColorScheme';

// Dependencies
interface ProvidersProps {
    children: ReactNode;
}

export default function Providers({ children }: ProvidersProps): JSX.Element {
    return <ColorModeProvider>{children}</ColorModeProvider>;
}
