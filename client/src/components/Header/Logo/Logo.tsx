// Dependencies
import Icon from '@components/Icon';
import './Logo.css';

/**
 * Header logo is the application branding svg that displays in context of the <Header/>
 *
 * @returns {JSX.Element} JSX element representing the Application Logo component.
 */
export default function HeaderLogo(): JSX.Element {
    return (
        <p className="logo">
            <Icon size="var(--size-7)" color="var(--brand)" type="LOGO" />
        </p>
    );
}
