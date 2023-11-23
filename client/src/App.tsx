import Providers from '@components/Providers';
import Pages from '@pages/Pages';

export default function App(): JSX.Element {
    return (
        <Providers>
            <Pages />
        </Providers>
    );
}
