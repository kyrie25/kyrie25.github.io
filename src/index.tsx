import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";

import "./index.scss";
import "react-tooltip/dist/react-tooltip.css";

import { Lanyard } from "./Lanyard";

const DISCORD_ID = import.meta.env.VITE_DISCORD_ID;

const Anchor = ({ href, children, ...props }) => (
	<a href={href} target="_blank" rel="noreferrer" {...props}>
		{children}
	</a>
);

const App: React.FC = () => {
	const [data, setData] = React.useState<Record<string, any>>({});

	useEffect(() => {
		fetch(`https://api.kyrie25.me/discord/${DISCORD_ID}`)
			.then((response) => response.json())
			.then((json) => setData(json));
	}, []);

	const ext = (hash: string | null) => (hash?.startsWith("a_") ? "gif" : "webp");

	const avatar = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.${ext(data.avatar)}?size=256`;
	const banner = `url(https://cdn.discordapp.com/banners/${data.id}/${data.banner}.${ext(data.banner)}?size=2048)`;

	return (
		<>
			<main>
				<Tooltip
					id="tooltip"
					style={{
						zIndex: 9999999,
					}}
				/>
				<section>
					<header>
						{data.banner && <div className="blur" style={{ backgroundImage: banner }}></div>}
						<div className="avatar">
							{data.avatar && <img src={avatar} alt="Kyrie25" />}
							<div className="name">
								<h1>Kyrie</h1>
								<span>@kyrie25</span>
							</div>
						</div>
					</header>

					<Lanyard id={DISCORD_ID} />

					<article>
						<h3>
							Junior full-stack developer, CS undergraduate at <Anchor href="https://fit.hcmus.edu.vn/">fit@hcmus</Anchor>
						</h3>
					</article>

					<article>
						<p>Absolute Granblue nerd</p>
						<p>My 3rd website so far i just want a clean site atp</p>
					</article>

					<article>
						<h3>Contact me via:</h3>
						<div className="icons">
							<Anchor href="mailto:contact@kyrie25.me" title="Mail">
								<FontAwesomeIcon icon={faEnvelope} size="1x" />
							</Anchor>
							<Anchor href={`https://discord.com/users/${data.id}`} title="Discord">
								<FontAwesomeIcon icon={faDiscord} size="1x" />
							</Anchor>
							<Anchor href="https://twitter.com/_kyrie_25" title="Twitter">
								<FontAwesomeIcon icon={faTwitter} size="1x" />
							</Anchor>
							<Anchor href="https://github.com/kyrie25" title="GitHub">
								<FontAwesomeIcon icon={faGithub} size="1x" />
							</Anchor>
						</div>
					</article>

					<footer>{data.id && <p>(images are taken from my discord profile)</p>}</footer>
				</section>
			</main>
			<Analytics />
		</>
	);
};

createRoot(document.getElementById("root")!).render(<App />);
