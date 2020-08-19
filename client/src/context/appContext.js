import React from 'react';

export const AppContext = React.createContext({
    interests: [],
    economicSectors:[]
});

export class AppContextProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            interests: [],
            economicSectors:[]
        };

        this.setInterests = this.setInterests.bind(this);
        this.setEconomicSector = this.setEconomicSector.bind(this);
    }

    setInterests(interest) {
        this.setState({interests: interest});
    }

    setEconomicSector(ecoSec) {
        this.setState({economicSectors: ecoSec});
    }


    render() {
        const {children} = this.props;
        const {interests} = this.state;
        const {economicSectors} = this.state;

        return (
            <AppContext.Provider value={{ interests, setInterests: this.setInterests, economicSectors,  setEconomicSector: this.setEconomicSector}}>
                {children}
            </AppContext.Provider>
        );
    }
}

export const AppContextConsumer = AppContext.Consumer;