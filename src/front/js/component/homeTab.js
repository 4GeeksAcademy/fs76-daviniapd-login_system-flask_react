import React, { useContext } from "react";

import { Context } from "../store/appContext";

export const HomeTab = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
					<div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
						<div className="container p-1">
							<div className="row g-2" id="gallery">
								<div className="col-4">
									<img src="https://img.freepik.com/premium-photo/set-futuristic-gaming-chairs-16-bit-pixel-with-led-lights-sl-game-asset-design-concept-art_655090-1872057.jpg" className="img-fluid my-1" alt="Gamer chair collage" />
                                    <img src="https://i.seadn.io/gae/W0zbk8A3Q-kW-psGuvSlSHqmzzM3xv0knCTdiLlNekooOalCr2bsOppCwmok1v_D0XFzv49oCoVW3pGvJilWEN5YB6TBHAKnO9iUBA?auto=format&dpr=1&w=1000" className="img-fluid my-1" alt="A psychedelic drawing of a person" />
									<img src="https://danschenker.com/wp-content/uploads/2022/09/danschenker_you_be_at_peace_8befd5be-4641-4c46-adf9-da296d065cca.png" className="img-fluid my-1" alt="Woman looking at a lake" />
								</div>
								<div className="col-4">
									<img src="https://static.vecteezy.com/system/resources/previews/034/545/064/non_2x/concept-of-cyber-crime-or-cyber-attack-graphic-of-skull-with-programming-script-background-vector.jpg" className="img-fluid my-1" alt="A skull on a computer screen" />
                                    <img src="https://cdn-thumbs.ohmyprints.net/1/1fd34cdbd3a6f043c688a9090d8c0fb2/817x600/thumbnail/fit.jpg" className="img-fluid my-1" alt="Robot and Balloon" />
									<img src="https://www.iespai.com/wp-content/uploads/2023/11/OIG-53.jpg" className="img-fluid my-1" alt="A drawing of a person using pc" />
								</div>
								<div className="col-4">
									<img src="https://imgcdn.stablediffusionweb.com/2024/5/17/e7fac0a3-bee9-4e6f-b45e-5626875e53cf.jpg" className="img-fluid my-1" alt="A woman using a computer" />
									<img src="https://los40.com/resizer/4gZrTVmH8wU3k1-SWUVrUDizZFY=/arc-photo-prisaradiolos40/eu-central-1-prod/public/C7QD3K5AXJFPDLDYU2NCCW2AP4.jpg" className="img-fluid my-1" alt="Person with wires on head" />
									<img src="https://cdn.pixabay.com/photo/2022/09/28/02/45/matrix-7484067_1280.jpg" className="img-fluid my-1" alt="Drawing psychedelic" />
								</div>
							</div>
						</div>
					</div>

		</>
	);
};
