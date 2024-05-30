const Header = ({title,children}) => {
    return (
        <div className="flex justify-between items-center p-4 bg-secondary">
            <h2 className="text-3xl font-medium">{title}</h2>
            {children}
        </div>
    );
};

export default Header;
