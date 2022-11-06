import 'dotenv';

export default class UrlUtil {
  static async generateEventDetailUrl(linkId: string): Promise<string> {
    /**
     * TODO - we are temporarily deactivating dynamic links till the mobile issues are fixed!
     */

    // return await this.getFirebaseDynamicLink(
    //   `${process.env.WEBSITE_URL}/event/${linkId}`,
    // );

    return `${process.env.WEBSITE_URL}/event/${linkId}`;
  }
}
