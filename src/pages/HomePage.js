import React, { useState } from "react";
import LoginOverlay from "../components/LoginOverlay";
import { useAuthorizationContext } from "../providers/LoginProvider";
import "../styles/HomePage.scss";
import LoadingPage from "./LoadingPage";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkImages from "remark-images";
/* import remarkOembed from "remark-oembed";
 */
const HomePage = () => {
  const [latestPost, setLatestPost] = useState(
    `To escape the insane heat in Tbilisi we decided to go to the Sioni Reservoir (about two hours out from here)! What a great trip it turned out to be! 😄

Also entirely unrelated, but there have been some horrible incidents of homophobia going on within Georgia these last few days, to the point where the Pride march had to be canceled. If you want to support the pride movement in a country where the LGBTQ community is often seriously suppresed / assaulted you can donate directly to them here: https://tbilisipride.ge/en-US/Donate
#### Sioni Beach
After a hot mashutka ride (it's currently 35 degrees here in Georgia) of two hours we arrived at the Sioni reservoir. We had to wait a few hours until check in, so we decided to get closer to the water. The "beach" was incredibly muddy and we were having some fun watching each other get stuck entirely in the mud! 😄

https://d1zae5r6xqzzk5.cloudfront.net/5/waypointmedia/81cd1b48-44f3-4ed6-bd4d-5acae7aabb84.jpg
https://d1zae5r6xqzzk5.cloudfront.net/5/waypointmedia/6fe86385-b828-47f5-8244-6258ef588f44.jpg
#### Lake House Sioni
We rented this cozy little cottage and made sure to get the most out of the amenities there. Hammock time, a small bonfire and watching a movie with the mini projector provided! 😄 Whilst a great place, it's definitely a bit far out and there are some improvements that could be made (e.g.: we ran out of water at some point and there was no fridge, which would've been nice this far out of town)! 😄 Still it was a great stay and the host is super friendly and let us use his inflatable rowboat! 😄

**My rating:** 7/10

https://d1zae5r6xqzzk5.cloudfront.net/5/waypointmedia/3323e7fc-043c-41e2-b21d-8d4ada475efd.jpg
https://d1zae5r6xqzzk5.cloudfront.net/5/waypointmedia/e2f6259c-7715-45cb-ad42-fa467a31a31e.jpg
https://d1zae5r6xqzzk5.cloudfront.net/5/waypointmedia/b70f53ee-ad1e-4ad1-a2a8-72371b799d71.jpg
#### Sioni Reservoir სიონის წყალსაცავი
Floating around in the boat with a glass of wine and some music was a great time for sure! 😄 There was a surprising amount of current on the reservoir, so I had to row back towards the coast a few times after drifting off towards the middle of the lake. At one point during the sunset it started to drizzle and in the distance thunder and lightning were seen and heard! With the summer heat, it was a great spectacle to behold! 😄 Of course I also jumped into the lake to go for a swim, which was greatly refreshing with the heat! 😄

**My rating:** 8/10

https://d1zae5r6xqzzk5.cloudfront.net/5/waypointmedia/13e4f1d7-b09c-44d6-911b-554f34529055.jpg
https://d1zae5r6xqzzk5.cloudfront.net/5/waypointmedia/c06e9bb7-073d-4ce5-9806-ea89cf5be690.jpg

![IMG_20210703_191302.jpg](https://files.peakd.com/file/peakd-hive/martibis/EpC9PF6WrsNe6kV2SYowpSeSXcDg9k5kvkcXYEeLrdMc3VqoqQAjV7GZaPdk3NjrH3W.jpg)

![IMG_20210704_123016.jpg](https://files.peakd.com/file/peakd-hive/martibis/EqL7ozE2vH1xretqLBCFx2Ay1fMHcrX2VXCBR6WwvDir2DsLNEhZGqTJbNdq9BbeSxQ.jpg)


**Join me on [Haveyoubeenhere](https://www.haveyoubeenhere.com), the social media app for travelers! 😄**


[//]:# (!pinmapple 41.98904368757831 lat 45.01729907402817 long d3scr)`
  );

  const loginData = useAuthorizationContext();

  return (
    <div id="home-page">
      {loginData.connecting ? (
        <LoadingPage></LoadingPage>
      ) : !loginData.loggedIn ? (
        <LoginOverlay />
      ) : (
        <div className="fast-curate">
          <ReactMarkdown
            className="markdown-body"
            children={latestPost}
            remarkPlugins={[remarkGfm, remarkImages]}
          ></ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default HomePage;
