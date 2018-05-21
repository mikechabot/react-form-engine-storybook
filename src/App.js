import React from 'react';
import { FormEngine, Form } from 'react-json-form-engine';

import LogService from './services/log-service';
import LocalStorageService from './services/local-storage/local-storage-service';

import Footer from './Footer';
import AppPanels from './AppPanels';
import Navbar from './components/common/bulma/Navbar';

import { Tabs, Tab } from './components/common/tabs';
import { Flex } from './components/common';

import JSON_FORMS from './examples';
const STORAGE_KEY = 'EXAMPLE_APP';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: 0,
            form: {},
            model: {},
            instance: null,
            instances: {}
        };
        this._handleTabSelect = this._handleTabSelect.bind(this);
        this._setLocalStorage = this._setLocalStorage.bind(this);
    }

    componentDidMount() {
        this._initInstance(__getPersistedKey(0));
    }

    componentWillUnmount() {
        this._setLocalStorage();
    }

    render() {
        const { instance } = this.state;
        return (
            <Flex column className="full-height" flexShrink={0}>
                {this._renderHeader()}
                <Tabs
                    id="react-form-engine-example"
                    activeKey={this.state.activeKey}
                    onSelect={this._handleTabSelect}
                >
                    {this._renderTabs(instance)}
                </Tabs>
                <Footer />
            </Flex>
        );
    }

    _renderHeader() {
        return (
            <Navbar
                id="main-nav"
                icon="cube"
                url="http://www.github.com/mikechabot/react-json-form-engine"
                label="react-json-form-engine"
            />
        );
    }

    _initInstance(activeKey) {
        const form = JSON_FORMS[activeKey];
        const { instances } = this.state;

        let instance = instances[form.id];
        if (!instance || !instance.isValid()) {
            const options = { liveValidation: true };
            // Generate instance from JSON
            instance = new FormEngine(form, null, options);
            instances[form.id] = instance;
        }

        this.setState(
            {
                activeKey,
                form,
                instance,
                instances
            },
            this._setLocalStorage
        );
    }

    _renderTabs(instance) {
        return JSON_FORMS.map((form, index) => (
            <Tab key={index} eventKey={index} label={form.title}>
                {this._renderTabContent(form, index, instance)}
            </Tab>
        ));
    }

    _renderTabContent(form, index, instance) {
        if (this.state.activeKey === index && instance) {
            return (
                <Flex flexWrap="wrap" className="full-height section" flexShrink={0}>
                    <Flex flexShrink={0} flex={index > 4 ? 2 : 0.75} minWidth={425}>
                        <Form
                            instance={instance}
                            onUpdate={this._onFormUpdate.bind(this)}
                            onSubmit={this._onSubmit.bind(this)}
                        />
                    </Flex>
                    <Flex flex={2}>
                        <AppPanels instance={instance} form={form} />
                    </Flex>
                </Flex>
            );
        }
    }

    _handleTabSelect(eventKey) {
        const { activeKey } = this.state;
        if (eventKey !== activeKey) {
            this._initInstance(eventKey);
        }
    }

    _onSubmit() {
        const { instance } = this.state;
        const title = instance.getFormTitle();
        LogService.logGroup(`Form Instance (${title})`, instance);
        LogService.logGroup(`Instance Model (${title})`, instance.getModel().findAll());
    }

    _onFormUpdate(changeEvent) {
        // You might want to do something with the latest change
        // event, and then use "setState", otherwise just force a refresh
        this.forceUpdate();
    }

    _setLocalStorage(activeKey) {
        LocalStorageService.setStickyTab(STORAGE_KEY, {
            activeKey: activeKey || this.state.activeKey
        });
    }
}

const __getPersistedKey = defaultKey => {
    let activeKey = defaultKey;
    const savedState = LocalStorageService.getStickyTab(STORAGE_KEY);
    if (savedState) {
        activeKey = savedState.activeKey;
    }
    return activeKey;
};

export default App;
