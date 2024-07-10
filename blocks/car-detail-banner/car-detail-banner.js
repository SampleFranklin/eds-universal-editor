import { fetchPlaceholders } from "../../scripts/aem.js";
import ctaUtils from '../../utility/ctaUtils.js';

export default async function decorate(block) {
    const { publishDomain } = await fetchPlaceholders();
    const graphQlEndpoint = `${publishDomain}/graphql/execute.json/msil-platform/carDetailBanner;modelId=BZ`;
    const [
        modelIdEl,
        startingPriceTextEl,
        testDriveTextEl,
        scrollMoreTextEl,
        primaryCtaTextEl,
        primaryCtaLinkEl,
        primaryCtaTargetEl,
        secondaryCtaTextEl,
        secondaryCtaLinkEl,
        secondaryCtaTargetEl
    ] = block.children;

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    fetch(graphQlEndpoint, requestOptions)
        .then((response) => response.json())
        .then((result) => { })
        .catch();

    const modelId = modelIdEl?.textContent?.trim();
    const startingPriceText = startingPriceTextEl?.textContent?.trim();
    const testDriveText = testDriveTextEl?.textContent?.trim();
    const scrollMoreText = scrollMoreTextEl?.textContent?.trim();
    const primaryCta = ctaUtils.getLink(primaryCtaLinkEl, primaryCtaTextEl, primaryCtaTargetEl, 'button-primary-light');
    const secondaryCta = ctaUtils.getLink(secondaryCtaLinkEl, secondaryCtaTextEl, secondaryCtaTargetEl, 'button-secondary-light');
}
    