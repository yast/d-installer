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

require "dinstaller/luks_activation_question"
require "dinstaller/can_ask_question"
require "y2storage/disk_size"

module DInstaller
  module Storage
    module Callbacks
      # Callbacks for LUKS activation
      class ActivateLuks
        include CanAskQuestion

        # Constructor
        #
        # @param questions_manager [QuestionsManager]
        # @param logger [Logger]
        def initialize(questions_manager, logger)
          @questions_manager = questions_manager
          @logger = logger
        end

        # Asks whether to activate a LUKS device
        #
        # @note The process waits until the question is answered.
        #
        # @param info [Storage::LuksInfo]
        # @param attempt [Numeric]
        #
        # @return [Array(Boolean, String)] The first value is whether to activate the device, and
        #   the second one is the LUKS password. Note that the password would only be considered
        #   when the first value is true.
        def call(info, attempt)
          question = question(info, attempt)

          ask(question) do |q|
            logger.info("#{q.text} #{q.answer}")

            activate = q.answer == :decrypt
            password = q.password

            [activate, password]
          end
        end

      private

        # @return [QuestionsManager]
        attr_reader :questions_manager

        # @return [Logger]
        attr_reader :logger

        # Question to ask for LUKS activation
        #
        # @return [LuksActivationQuestion]
        def question(info, attempt)
          LuksActivationQuestion.new(info.device_name,
            label:   info.label,
            size:    formatted_size(info.size),
            attempt: attempt)
        end

        # Generates a formatted representation of the size
        #
        # @param size [Y2Storage::DiskSize]
        # @return [String]
        def formatted_size(value)
          Y2Storage::DiskSize.new(value).to_human_string
        end
      end
    end
  end
end
