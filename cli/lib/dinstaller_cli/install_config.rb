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

require "yaml"

module DInstallerCli
  # Class to represent the installation config
  class InstallConfig
    # Product to install
    #
    # @return [String, nil] id of the product (e.g., "Tumbleweed")
    attr_accessor :product

    # Languages to install
    #
    # @return [Array<String>] ids of the languages (e.g., ["en_UK", "es_ES"])
    attr_accessor :languages

    # Target devices
    #
    # @return [Array<String>] device names (e.g., ["/dev/vda"])
    attr_accessor :disks

    # User config
    #
    # @return [InstallConfig::User, nil]
    attr_accessor :user

    # Root config
    #
    # @return [InstallConfig::Root, nil]
    attr_accessor :root

    def initialize
      @product = nil
      @languages = []
      @disks = []
      @user = nil
      @root = nil
    end

    # Dumps the settings in YAML format
    #
    # @return [String]
    def dump
      to_h.to_yaml
    end

    # Converts the settings to hash
    #
    # @return [Hash]
    def to_h
      {
        "product"   => product,
        "languages" => languages,
        "disks"     => disks,
        "user"      => user&.to_h || {},
        "root"      => root&.to_h || {}
      }
    end

    # Class to represent the user config
    class User
      # @param [String, nil]
      attr_accessor :name

      # @param [String, nil]
      attr_accessor :fullname

      # @param [String, nil]
      attr_accessor :password

      # @param [Boolean]
      attr_accessor :autologin

      # Constructor
      #
      # @param name [String] user name
      # @param fullname [String, nil] full user name
      # @param password [String, nil] user password
      # @param autologin [Boolean] user autologin option
      def initialize(name: nil, fullname: nil, password: nil, autologin: false)
        @name = name
        @fullname = fullname
        @password = password
        @autologin = autologin
      end

      # Converts the settings to hash
      #
      # @return [Hash]
      def to_h
        {
          "name"      => name,
          "fullname"  => fullname,
          "autologin" => autologin,
          "password"  => password
        }
      end
    end

    # Class to represent the root user config
    class Root
      # @return [String, nil]
      attr_accessor :password

      # @return [String, nil]
      attr_accessor :ssh_key

      # Constructor
      #
      # @param password [String, nil]
      # @param ssh_key [String, nil]
      def initialize(password: nil, ssh_key: nil)
        @password = password
        @ssh_key = ssh_key
      end

      # Converts the settings to hash
      #
      # @return [Hash]
      def to_h
        {
          "ssh_key"  => ssh_key,
          "password" => password
        }
      end
    end
  end
end
