/*
 * Copyright (c) [2022] SUSE LLC
 *
 * All Rights Reserved.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of version 2 of the GNU General Public License as published
 * by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, contact SUSE LLC.
 *
 * To contact SUSE LLC about this file by physical or electronic mail, you may
 * find current contact information at www.suse.com.
 */

import Client from "./client";

const MANAGER_IFACE = "org.opensuse.DInstaller.Manager1";

export default class ManagerClient extends Client {
  /**
   * Start the installation process
   *
   * The progress of the installation process can be tracked through installer
   * signals (see {onSignal}).
   *
   * @return {Promise}
   */
  async startInstallation() {
    const proxy = await this.proxy(MANAGER_IFACE);
    return proxy.Commit();
  }

  /**
   * Return the installer status
   *
   * @return {Promise.<number>}
   */
  async getStatus() {
    const proxy = await this.proxy(MANAGER_IFACE);
    return proxy.Status;
  }
}