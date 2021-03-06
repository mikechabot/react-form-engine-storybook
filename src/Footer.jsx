import React from 'react';
import Icon from './components/common/Icon';
import Flex from './components/common/glamorous/Flex';

function Footer() {
    return (
        <footer className="footer has-text-grey-light">
            <div className="container">
                <div className="content has-text-centered">
                    <p>
                        <strong className="has-text-grey-light">
                            <Icon icon="cube" />
                            &nbsp;react-json-form-engine
                        </strong>{' '}
                        by{' '}
                        <a
                            href="https://github.com/mikechabot"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Mike Chabot
                        </a>.
                        <br />
                        The{' '}
                        <a
                            href="https://github.com/mikechabot/react-json-form-engine"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            source code
                        </a>{' '}
                        is licensed under{' '}
                        <a href="https://github.com/mikechabot/react-json-form-engine/blob/master/LICENSE">
                            MIT
                        </a>
                    </p>
                    <Flex hAlignCenter>
                        <GithubButton
                            label="Star"
                            icon="octicon-star"
                            href="mikechabot/react-json-form-engine"
                            ariaLabel="Star mikechabot/react-json-form-engine on GitHub"
                        />
                        <GithubButton
                            label="Fork"
                            icon="octicon-repo-forked"
                            href="mikechabot/react-json-form-engine/fork"
                            ariaLabel="Fork mikechabot/react-json-form-engine on GitHub"
                        />
                        <GithubButton
                            label="Watch"
                            icon="octicon-eye"
                            href="mikechabot/react-json-form-engine/subscription"
                            ariaLabel="Watch mikechabot/react-json-form-engine on GitHub"
                        />
                    </Flex>
                </div>
            </div>
        </footer>
    );
}

const GithubButton = ({ label, icon, href, ariaLabel }) => {
    return (
        <div style={{ margin: 5 }}>
            <a
                className="github-button"
                href={`https://github.com/${href}`}
                data-icon={icon}
                data-size="large"
                data-show-count={true}
                aria-label={ariaLabel}
            >
                {label}
            </a>
        </div>
    );
};

export default Footer;
