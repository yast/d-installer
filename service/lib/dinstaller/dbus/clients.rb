# frozen_string_literal: true

# Copyright (c) [2022] SUSE LLC
#
# All Rights Reserved.
#
# This program is free software; you can redistribute it and/or modify it
# under the terms of version 2 of the GNU General Public License as published
# by the Free Software Foundation.
#
# This program is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
# FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
# more details.
#
# You should have received a copy of the GNU General Public License along
# with this program; if not, contact SUSE LLC.
#
# To contact SUSE LLC about this file by physical or electronic mail, you may
# find current contact information at www.suse.com.

module DInstaller
  module DBus
    # Namespace for Clients for DBus API.
    # It provides API to be called from other services.
    # E.g. Users class is used from other services to call Users DBus API.
    module Clients
    end
  end
end

require "dinstaller/dbus/clients/dinstaller"
require "dinstaller/dbus/clients/software"
require "dinstaller/dbus/clients/users"
